from django.urls import path,include
from .views import *

urlpatterns = [
    path('register', UserRegister.as_view(), name='register'),
	path('login', UserLogin.as_view(), name='login'),
	path('logout', UserLogout.as_view(), name='logout'),
	path('user', UserView.as_view(), name='user'),

	path('', my_api_view, name='home'),

	path('create_group', CreateGroupView.as_view(), name='create_group'),
	path('join_group', JoinGroupView.as_view(), name='join_group'),
	path('rename_group', RenameGroupView.as_view(), name='rename_group'),
	path('leave_group', LeaveGroupView.as_view(), name='leave_group'),
	path('delete_group', DeleteGroupView.as_view(), name='leave_group'),
]