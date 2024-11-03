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
from .serializers import UserRegisterSerializer, UserLoginSerializer, UserSerializer

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
        serializer = UserSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)

# TODO: remove later
def my_api_view(request):
    data = {"message": "Hello, World!", "status": "success"}
    return JsonResponse(data)

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
def is_settled_up(user_id):
    #TODO: add logic for user settling up
    return True

# is_everyone_settled_up
def is_everyone_settled_up():
    # TODO: code logic
    return False

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
            if is_settled_up(user_id):
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
            if is_everyone_settled_up():
                return JsonResponse({"detail":"Group Deleted"}, status = 200)
            else:
                return JsonResponse({"detail":"Users are not settled up, users needs to settle up first, Group Delete Failed! !"}, status = 400)
        else:
            return JsonResponse({"detail":"please provide a integer group_id variable"}, status = 404)

# /remove_transaction
# /edit_transaction
# /all_transactions

# checks if users are valid and are all in the group
def are_users_in_group(users_involved,group,transaction_adder):    
    
    for i in users_involved:
        if i not in group.users:
            return f"User {i} not in group."

    if transaction_adder not in group.users:
        return f"User {transaction_adder} not in group."
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
            areUsersValid = are_users_in_group(users_involved,transaction.group,form.cleaned_data['transaction_adder'])
            
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
            
            transaction.save()
            
            # for each user involved, make a owing row
            for index,value in enumerate(users_involved):
                if payer_id != value:
                    owing = Owing()
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
                    "bill_id":transaction.bill.id,
                    "payer":transaction.payer.username,
                    "payer_id":transaction.payer.user_id,
                    "transaction_adder_id":transaction.transaction_adder.user_id,
                    "transaction_adder":transaction.transaction_adder.username,
                    "users_involved_id": transaction.users_involved,
                    "users_involved":users_involved,
                    "amount_users_own":transaction.amount_users_own,
                    "total_amount":transaction.total_amount,
                }
                all_transactions_data.append(data)
                
            return JsonResponse({"detail":all_transactions_data}, status = 200)
        else:
            return JsonResponse({"detail":"Please Provide group_id as integer"}, status = 404)