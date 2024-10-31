from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from django.core.exceptions import ValidationError

UserModel = get_user_model()
# user register validations
class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = "__all__"

    def create(self, clean_data):
        user_obj = UserModel.objects.create_user(
            email=clean_data["email"], password=clean_data["password"],username = clean_data["username"]
        )
        user_obj.save()
        return user_obj

# user login validations
class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    ##
    def check_user(self, clean_data):
        user = authenticate(username=clean_data["email"], password=clean_data["password"])
        if not user:
            raise serializers.ValidationError("user not found")
        return user

# user serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ("user_id","username","groups_joined")
