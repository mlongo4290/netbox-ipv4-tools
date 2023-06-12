from django.shortcuts import render
from django.views.generic import View
from django.contrib.auth.mixins import LoginRequiredMixin

class CIDRTableView(LoginRequiredMixin, View):
    def get(self, request):
        return render(
            request,
            "netbox_ipv4_tools/cidr.html",
        )

class CIDRToIpRangeView(LoginRequiredMixin, View):
    def get(self, request):
        return render(
            request,
            "netbox_ipv4_tools/cidr-to-range.html",
        )

class SupernetCalculatorView(LoginRequiredMixin, View):
    def get(self, request):
        return render(
            request,
            "netbox_ipv4_tools/supernet-calculator.html",
        )