from pathlib import Path

from setuptools import find_packages, setup

readme = Path(__file__).parent / "README.md"
long_description = readme.read_text()

setup(
    name="netbox-ipv4-tools",
    version="1.0.4",
    description="Work with ipv4 in NetBox",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/mlongo4290/netbox-ipv4-tools",
    author="Michael Longo",
    license="Apache 2.0",
    install_requires=[],
    packages=find_packages(),
    include_package_data=True,
    keywords=["netbox-plugin"],
    classifiers=[
        "Programming Language :: Python",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3 :: Only",
    ],
    project_urls={
        "Source": "https://github.com/mlongo4290/netbox-ipv4-tools",
    },
)
