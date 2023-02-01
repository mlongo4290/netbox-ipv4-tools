from extras.plugins import PluginMenuItem

menu_items = (
    PluginMenuItem(
        link='plugins:netbox_ipv4_tools:cidr_table',
        link_text='CIDR Conversion Table'
    ),
    PluginMenuItem(
        link='plugins:netbox_ipv4_tools:cidr_to_range',
        link_text='CIDR to IP Range'
    ),
)