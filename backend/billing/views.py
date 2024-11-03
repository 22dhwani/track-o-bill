from .forms import *
from .models import *
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.views.generic import View
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from rest_framework.authtoken.models import Token
from django.contrib.auth import get_user_model, login, logout
from .validations import custom_validation, validate_email, validate_password
from rest_framework.authentication import SessionAuthentication,TokenAuthentication
from .serializers import UserRegisterSerializer, UserLoginSerializer

# Registration View
class UserRegister(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        clean_data = custom_validation(request.data)
        serializer = UserRegisterSerializer(data=clean_data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.create(clean_data)
            if user:
                token = Token.objects.create(user=user)
                return Response({"token":token.key,**serializer.data}, status=status.HTTP_201_CREATED)

        return Response(status=status.HTTP_400_BAD_REQUEST)

# Login View
class UserLogin(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        try:
            data = request.data
            assert validate_email(data)
            assert validate_password(data)
            serializer = UserLoginSerializer(data=data)
            if serializer.is_valid(raise_exception=True):
            
                user = serializer.check_user(data)
                login(request, user)
                token = Token.objects.get(user=user)
                return Response({"token":token.key,**serializer.data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)

# Logout View
class UserLogout(APIView):
    permission_classes = [permissions.IsAuthenticated,]
    authentication_classes = [TokenAuthentication]

    def post(self, request):
        # delete old token
        print(request.user)
        old_token = Token.objects.get(user=request.user)
        old_token.delete()
        
        new_token = Token.objects.create(user=request.user) # generate new token
        logout(request)
        return Response(status=status.HTTP_200_OK)

# To get all the groups user has joined in
class UserView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (TokenAuthentication,)

    # get method
    def get(self, request):
        user = request.user
        data = {
            "user_id":user.user_id,
            "username":user.username,
            "groups_joined":user.groups_joined,
            "groups":[get_object_or_404(Group,id=i).name for i in user.groups_joined]
        }
        return Response(data, status=status.HTTP_200_OK)

# create group
class CreateGroupView(APIView): 
    permission_classes = [permissions.IsAuthenticated,]
    authentication_classes = [TokenAuthentication]
    
    def post(self,request,format=None):
        form = CreateGroupForm(request.data)
        if form.is_valid():
            group = Group()
            group.name = form.cleaned_data['group_name']
            group.created_by = request.user
            group.users  = [request.user.user_id]
            group.save()
            
            # update user model to hold groups joined
            request.user.groups_joined.append(group.id) 
            request.user.save()
            return JsonResponse({"detail":"Group Created"}, status = 200)
        else:
            return JsonResponse({"detail":"please provide group_name variable"}, status = 404)

# rename group
class RenameGroupView(APIView): 
    permission_classes = [permissions.IsAuthenticated,]
    authentication_classes = [TokenAuthentication]
    
    def post(self,request,format=None):
        form1 = CreateGroupForm(request.data)
        form2 = GroupForm(request.data)
        if form1.is_valid() and form2.is_valid():
            group = get_object_or_404(Group,id=form2.cleaned_data['group_id'])
            group.name = form1.cleaned_data['group_name'] # update user model to add this group to groups joined
            group.save()
            return JsonResponse({"detail":"Group Renamed!"}, status = 200)
        else:
            return JsonResponse({"detail":"please provide group_name & integer group_id variable"}, status = 404)

# join group
class JoinGroupView(APIView): 
    permission_classes = [permissions.IsAuthenticated,]
    authentication_classes = [TokenAuthentication]
    
    def post(self,request,format=None):
        form = GroupForm(request.data)
        if form.is_valid():
            
            group = get_object_or_404(Group,id=form.cleaned_data['group_id'])
            
            user_id = request.user.user_id
            if user_id not in group.users:
                
                group.users.append(user_id)
                
                # if user was a past member, remove him from left_users
                if user_id in group.left_users:
                    group.left_users.remove(user_id)
                group.save()
                
                # update user model to add this group to groups joined
                request.user.groups_joined.append(group.id) 
                request.user.save()
                return JsonResponse({"detail":"Group Joined"}, status = 200)
            else:
                return JsonResponse({"detail":"Already in Group"}, status = 200)
        else:
            return JsonResponse({"detail":"please provide a integer group_id variable"}, status = 404)

# is settled up
def is_settled_up(user,group,everyone=False):
    is_settled = True
    
    all_transactions = Transaction.objects.filter(group=group)
    
    # for all transactions in a group
    for transaction in all_transactions:
        
        # get all owings of a user which are not settled
        ownings = Owning.objects.filter(transaction = transaction,is_settled = False)
        
        # if everyone don't filter 
        if not everyone:
            ownings1 = ownings.filter(owner = user)
            ownings2 = ownings.filter(borrower = user)
            ownings = ownings1 | ownings2 # add query set 
        
        # check if all transactions are settled
        for owning in ownings:
            if not owning.is_settled:
                return False
            
    return is_settled

# leave group
class LeaveGroupView(APIView): 
    permission_classes = [permissions.IsAuthenticated,]
    authentication_classes = [TokenAuthentication]
    
    def post(self,request,format=None):
        form = GroupForm(request.data)
        if form.is_valid():
            group = get_object_or_404(Group,id=form.cleaned_data['group_id'])
            user_id = request.user.user_id
            
            # is user Settled up ? if yes only then let him leave
            if is_settled_up(request.user,group):
                if user_id in group.users:
                    group.users.remove(user_id) # remove user
                    group.left_users.append(user_id) # add user to left_users       
                    group.save()
                    
                    # update user model to remove this group from groups joined
                    request.user.groups_joined.remove(group.id) 
                    request.user.save()
                    return JsonResponse({"detail":"Group Left"}, status = 200)
                else:
                    return JsonResponse({"detail":"Not Joined Group Yet"}, status = 200)
            else:
                return JsonResponse({"detail":"User is not settled up, user needs to settle up first !"}, status = 400)
        else:
            return JsonResponse({"detail":"please provide a integer group_id variable"}, status = 404)

# delete group
class DeleteGroupView(APIView): 
    permission_classes = [permissions.IsAuthenticated,]
    authentication_classes = [TokenAuthentication]
    
    def post(self,request,format=None):
        form = GroupForm(request.data)
        if form.is_valid():
            group = get_object_or_404(Group,id=form.cleaned_data['group_id'])
            user_id = request.user.user_id
            
            # is user Settled up ? if yes only then let him leave
            if is_settled_up(request.user,group,True):
                return JsonResponse({"detail":"Group Deleted"}, status = 200)
            else:
                return JsonResponse({"detail":"Users are not settled up, users needs to settle up first, Group Delete Failed! !"}, status = 400)
        else:
            return JsonResponse({"detail":"please provide a integer group_id variable"}, status = 404)

# checks if users are valid and are all in the group
def are_users_in_group(users_involved,group):    
    
    for i in users_involved:
        if i not in group.users:
            return f"User {i} not in group."
    return True

# add transactions
class AddTransactionView(APIView): 
    permission_classes = [permissions.IsAuthenticated,]
    authentication_classes = [TokenAuthentication]
    
    def post(self,request,format=None):
        form = AddTransactionForm(request.data)
        if form.is_valid():
            
            # fields
            users_involved = form.cleaned_data['users_involved']
            amount_users_own = form.cleaned_data['amount_users_own']
            
            # if not list send error
            if type(users_involved) is not list or type(amount_users_own) is not list:
                return JsonResponse({"detail":"give users_involved, amount_users_own as list"}, status = 400)
            elif len(users_involved) != len(amount_users_own):
                return JsonResponse({"detail":"give users_involved, amount_users_own as list of same length"}, status = 400)
                        
            transaction = Transaction()
            transaction.group = get_object_or_404(Group,id=form.cleaned_data['group_id'])
            areUsersValid = are_users_in_group(users_involved,transaction.group)
            
            # if users are not in group, remove them
            if type(areUsersValid) == str:
                return JsonResponse({"detail":areUsersValid}, status = 400)
            
            # check if adder and payer in group
            areUsersValid = are_users_in_group([form.cleaned_data['transaction_adder'],form.cleaned_data['payer_id']],transaction.group)
            # if users are not in group, remove them
            if type(areUsersValid) == str:
                return JsonResponse({"detail":areUsersValid}, status = 400)
            
            
            transaction.bill = get_object_or_404(Bill,id= 1) # TODO: Add bill_id later from form.cleaned_data['bill_id']
            payer_id = form.cleaned_data['payer_id']
            transaction.payer = get_object_or_404(AppUser,user_id= payer_id)
            
            transaction.transaction_adder = get_object_or_404(AppUser,user_id= form.cleaned_data['transaction_adder'])
            transaction.users_involved = users_involved
            transaction.amount_users_own = amount_users_own
            transaction.total_amount = form.cleaned_data['total_amount']  # Total amount of the transaction
            transaction.name = form.cleaned_data['name']
            
            sum_ = 0
            for i in amount_users_own:
                sum_+=i
            if round(transaction.total_amount,2) == round(sum_,2):
                transaction.save()
            else:
                return JsonResponse({"detail":"amount_users_own's sum and total_amount are not equal"}, status = 400)
            
            # for each user involved, make a owing row
            for index,value in enumerate(users_involved):
                if payer_id != value:
                    owing = Owning()
                    owing.transaction = transaction
                    owing.owner = transaction.payer
                    owing.borrower = get_object_or_404(AppUser,user_id = value)
                    owing.amount = amount_users_own[index]
                    owing.save()
            
            return JsonResponse({"detail":"Transaction Added"}, status = 200)
        else:
            return JsonResponse({"detail":"Please Provide bill_id, group_id, payer_id, transaction_adder as integers, users_involved, amount_users_own as lists and total_amount as a decimal field"}, status = 404)

# remove transactions
class RemoveTransactionView(APIView): 
    permission_classes = [permissions.IsAuthenticated,]
    authentication_classes = [TokenAuthentication]
    
    def post(self,request,format=None):
        form = RemoveTransactionForm(request.data)
        
        if form.is_valid():
            transaction = get_object_or_404(Transaction,id=form.cleaned_data['transaction_id'])
            transaction.bill.delete()
            transaction.delete() 
            return JsonResponse({"detail":"Transaction Removed"}, status = 200)
        else:
            return JsonResponse({"detail":"Please Provide transaction_id as integer"}, status = 404)

# list alll transactions
class ListAllTransactionsView(APIView): 
    permission_classes = [permissions.IsAuthenticated,]
    authentication_classes = [TokenAuthentication]
    
    def get(self,request,format=None):
        form = GroupForm(request.data)
        
        if form.is_valid():
            
            group = get_object_or_404(Group,id=form.cleaned_data['group_id'])
            
            # get all transactions of a group
            all_transactions = Transaction.objects.filter(group=group)
            
            all_transactions_data = []
            
            for transaction in all_transactions:
                # get names of all users
                users_involved = []
                for i in transaction.users_involved:
                    username = get_object_or_404(AppUser,user_id=i).username # get username of involved user
                    users_involved.append(username)
                
                data = {
                    "transaction_id":transaction.id,
                    "name":transaction.name,
                    "bill_id":transaction.bill.id,
                    "payer":transaction.payer.username,
                    "payer_id":transaction.payer.user_id,
                    "transaction_adder_id":transaction.transaction_adder.user_id,
                    "transaction_adder":transaction.transaction_adder.username,
                    "users_involved_id": transaction.users_involved,
                    "users_involved":users_involved,
                    "amount_users_own":transaction.amount_users_own,
                    "total_amount":transaction.total_amount,
                    "date":transaction.created_at.date()
                }
                all_transactions_data.append(data)
                
            return JsonResponse({"detail":all_transactions_data}, status = 200)
        else:
            return JsonResponse({"detail":"Please Provide group_id as integer"}, status = 404)

# edit transaction
class EditTransactionsView(APIView):
    permission_classes = [permissions.IsAuthenticated,]
    authentication_classes = [TokenAuthentication]
    
    # post request
    def post(self,request,format=None):
        form = EditTransactionForm(request.data)
        
        if form.is_valid():
            
            # get transaction, transaction must exist
            transaction = get_object_or_404(Transaction,id=form.cleaned_data['transaction_id'])
            
            # get fields from form
            users_involved = form.cleaned_data['users_involved']
            amount_users_own = form.cleaned_data['amount_users_own']
            payer_id = form.cleaned_data['payer_id']
            payer = get_object_or_404(AppUser,user_id = payer_id)
            
            # if not list send error
            if type(users_involved) is not list or type(amount_users_own) is not list:
                return JsonResponse({"detail":"give users_involved, amount_users_own as list"}, status = 400)
            elif len(users_involved) != len(amount_users_own):
                return JsonResponse({"detail":"give users_involved, amount_users_own as list of same length"}, status = 400)
            
            # if users are not in group, remove them
            areUsersValid = are_users_in_group(users_involved,transaction.group)
            if type(areUsersValid) == str:
                return JsonResponse({"detail":areUsersValid}, status = 400)
            
            # check if payer in group
            areUsersValid = are_users_in_group([payer_id],transaction.group)
            # if users are not in group, remove them
            if type(areUsersValid) == str:
                return JsonResponse({"detail":areUsersValid}, status = 400)
            
            # update with new values
            transaction.payer = payer
            transaction.users_involved = users_involved
            transaction.amount_users_own = amount_users_own
            transaction.total_amount = form.cleaned_data['total_amount']
            transaction.name = form.cleaned_data['name']
            
            sum_ = 0
            for i in amount_users_own:
                sum_+=i
            if round(transaction.total_amount,2) == round(sum_,2):
                transaction.save()
            else:
                return JsonResponse({"detail":"amount_users_own's sum and total_amount are not equal"}, status = 400)
            
            # delete all owings and recreate them with new values later
            ownings = Owning.objects.filter(transaction = transaction)
            for i in ownings:
                i.delete()
            
            # for each user involved, make a owing row
            for index,value in enumerate(users_involved):
                if payer_id != value:
                    owing = Owning()
                    owing.transaction = transaction
                    owing.owner = transaction.payer
                    owing.borrower = get_object_or_404(AppUser,user_id = value)
                    owing.amount = amount_users_own[index]
                    owing.save()
            
            return JsonResponse({"detail":"Transaction Edited"}, status = 200)
        else:
            return JsonResponse({"detail":"Please Provide group_id as integer"}, status = 404)

def calculate_bill(this_user,other_users,group):
    
    all_transactions = Transaction.objects.filter(group=group)
    
    # owing and borrowing will be two dictonaries
    # bill = owning - borrowing 
    owning = {}
    borrowing = {}
    bill = []
    
    # initialize owning and borrowing
    for i in other_users:
        owning[(i.user_id,i.username)] = 0
        borrowing[(i.user_id,i.username)] = 0
    
    for transaction in all_transactions:
        
        # get all ownings for a single transaction
        ownings = Owning.objects.filter(transaction = transaction,is_settled=False)
        
        for o in ownings:
            # owning 
            if this_user == o.owner:
                owning[(o.borrower.user_id,o.borrower.username)]+= o.amount
            
            # borrower
            elif this_user == o.borrower:
                borrowing[(o.owner.user_id,o.owner.username)] += o.amount
    
    # create bill = owning - borrowing
    for i in other_users:
        bill_ = owning[(i.user_id,i.username)] - borrowing[(i.user_id,i.username)] 
        bill.append(bill_)
    
    return bill

# settle up view
class SettleUpView(APIView):
    permission_classes = [permissions.IsAuthenticated,]
    authentication_classes = [TokenAuthentication]
    
    # get all users and bills we have to own/borrow from them
    def get(self,request,format=None):
        
        form = GroupForm(request.data)
        if form.is_valid():
            group = get_object_or_404(Group,id=form.cleaned_data['group_id'])
            current_user = request.user.user_id
            
            if current_user in group.users:
                # get all the users except the authorized user
                users = [get_object_or_404(AppUser,user_id=i) for i in group.users if i != current_user]
                
                bill = calculate_bill(request.user,users,group)

                data = {
                    "users":[i.username for i in users],
                    "user_ids":[i.user_id for i in users],
                    "bill":bill
                }
                
            else:
                return JsonResponse({"detail":"You are not Authourized to get access of this group as you aren't in it."}, status = 400)    
            
            return JsonResponse(data, status = 200)
        else:
            return JsonResponse({"detail":"Please Provide group_id as integer"}, status = 404)
        
    # get all users and bills we have to own/borrow from them
    def post(self,request,format=None):
        
        form = SettleUpForm(request.data)
        
        if form.is_valid():
            this_user = request.user.user_id
            other_user = form.cleaned_data['user_id']
            group = get_object_or_404(Group,id=form.cleaned_data['group_id'])
        
            if this_user == other_user:
                return JsonResponse({"detail":"You can't settle up with yourself"}, status = 400)
        
            all_transactions = Transaction.objects.filter(group=group)
            other_user = get_object_or_404(AppUser,user_id = other_user) # get the user object
            
            # for all transactions in a group
            for transaction in all_transactions:
                
                # get all owings between 2 users
                ownings = Owning.objects.filter(transaction = transaction,is_settled = False)
                ownings1 = ownings.filter(owner = this_user, borrower = other_user)
                ownings2 = ownings.filter(owner = other_user, borrower = this_user)
                ownings = ownings1 | ownings2 # add query set 
                
                # settle up
                for owning in ownings:
                    print(owning)
                    owning.is_settled = True
                    owning.save()
        return JsonResponse({"detail":"settled up"}, status = 200)