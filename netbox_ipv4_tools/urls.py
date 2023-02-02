from django.urls import path
from . import views

urlpatterns = (
    path('cidr-table/', views.CIDRTableView.as_view(), name='cidr_table'),
    path('cidr-to-range/', views.CIDRToIpRangeView.as_view(), name='cidr_to_range'),
    path('supernet-calculator/', views.SupernetCalculatorView.as_view(), name='supernet_calculator'),
)