import upwork

documentation = []
documentation.append("https://www.upwork.com/services/api/view/54228d4ec241ecc7fc56ea5b04483ea3")

public_key="54228d4ec241ecc7fc56ea5b04483ea3"
secret_key="c774e853860c5b4a"

client = upwork.Client(public_key, secret_key, **credentials)
provider_ref = "1234"
query = "SELECT amount WHERE date >= '2009-10-01' AND date <= '2009-10-31'"
a = client.finreport.get_provider_earnings(provider_ref, query)
print(a)
