from django.urls import path, include
from .views import *

urlpatterns = [
    path('register', UserRegister.as_view(), name='register'),
	path('login', UserLogin.as_view(), name='login'),
	path('logout', UserLogout.as_view(), name='logout'),
	path('user', UserView.as_view(), name='user'),
	path('user/<int:group_id>', GroupMembersView.as_view(), name='user'),

	path('create_group', CreateGroupView.as_view(), name='create_group'),
	path('join_group', JoinGroupView.as_view(), name='join_group'),
	path('rename_group', RenameGroupView.as_view(), name='rename_group'),
	path('leave_group', LeaveGroupView.as_view(), name='leave_group'),
	path('delete_group', DeleteGroupView.as_view(), name='leave_group'),

	path('add_transaction', AddTransactionView.as_view(), name='add_transaction'),
	path('remove_transaction', RemoveTransactionView.as_view(), name='remove_transaction'),
	path('list_all_transactions', ListAllTransactionsView.as_view(), name='list_all_transactions'),
	path('edit_transaction', EditTransactionsView.as_view(), name='edit_transactions'),
	
	path('settle_up', SettleUpView.as_view(), name='settle_up'),
     path('edit_user', EditUserAPIView.as_view(), name='edit_user'),
]