from django.shortcuts import render
from django.views.generic import View
from django.contrib.auth.mixins import PermissionRequiredMixin

class CIDRTableView(PermissionRequiredMixin, View):
    permission_required = "netbox_ipv4_tools.view_tools"

    def get(self, request):
        return render(
            request,
            "netbox_ipv4_tools/cidr.html",
        )

class CIDRToIpRangeView(PermissionRequiredMixin, View):
    permission_required = "netbox_ipv4_tools.view_tools"

    def get(self, request):
        return render(
            request,
            "netbox_ipv4_tools/cidr-to-range.html",
        )

class SupernetCalculatorView(PermissionRequiredMixin, View):
    permission_required = "netbox_ipv4_tools.view_tools"

    def get(self, request):
        return render(
            request,
            "netbox_ipv4_tools/supernet-calculator.html",
        )