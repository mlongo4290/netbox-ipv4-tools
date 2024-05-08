from netbox.plugins import PluginMenu, PluginMenuItem

menu = PluginMenu(
    label='IPv4 Tools',
    groups=(
        (
            'TOOLS',
            (
                PluginMenuItem(
                    link='plugins:netbox_ipv4_tools:cidr_table',
                    link_text='CIDR Conversion Table'
                ),
                PluginMenuItem(
                    link='plugins:netbox_ipv4_tools:cidr_to_range',
                    link_text='CIDR to IP Range'
                ),
                PluginMenuItem(
                    link='plugins:netbox_ipv4_tools:supernet_calculator',
                    link_text='Supernet calculator'
                ),
            ),
        ),
    ),
    icon_class='mdi mdi-ip-network',
)