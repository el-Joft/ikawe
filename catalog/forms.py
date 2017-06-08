from django import forms
from django.contrib.auth.models import User
from catalog.models import Book


class BorrowForm(forms.ModelForm):
    length_of_borrow = forms.CharField(max_length=128, help_text="", widget=forms.TextInput(
        attrs={'class': 'form-control', 'placeholder': 'Length of borrow', 'required': 'required'}))
    # first_name = forms.CharField(max_length=128, help_text="", widget=forms.TextInput(
    #     attrs={'class': 'form-control', 'placeholder': 'First Name', 'required': 'required'}))
    # last_name = forms.CharField(max_length=128, help_text="", widget=forms.TextInput(
    #     attrs={'class': 'form-control', 'placeholder': 'Last Name', 'required': 'required'}))
    # email = forms.EmailField(max_length=50, help_text="", widget=forms.EmailInput(attrs={
    #                          'class': 'form-control', 'placeholder': 'example@email.com', 'required': 'required'}))
    # password = forms.CharField(min_length=6, max_length=20, help_text="", widget=forms.PasswordInput(
    #     attrs={'class': 'form-control', 'placeholder': 'password', 'required': 'required'}))

    class Meta:
        model = User
        fields = ( 'length_of_borrow ',)



