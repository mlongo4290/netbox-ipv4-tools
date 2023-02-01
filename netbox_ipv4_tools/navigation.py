from extras.plugins import PluginMenu, PluginMenuItem

menu = PluginMenu(
    label='IPV4 Tools',
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
            ),
        ),
    ),
    icon_class='mdi mdi-ip-network',
)