from django.shortcuts import render
from django.views.generic import View

class CIDRTableView(View):
    def get(self, request):
        return render(
            request,
            "netbox_ipv4_tools/cidr.html",
        )

class CIDRToIpRangeView(View):
    def get(self, request):
        return render(
            request,
            "netbox_ipv4_tools/cidr-to-range.html",
        )