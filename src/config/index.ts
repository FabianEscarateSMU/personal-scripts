
export const CONFIG = {
   X_VTEX_API_KEY_UNIMARC
X_VTEX_API_TOKEN_UNIMARC
X_VTEX_BASE_URL_UNIMARC
} = process.env;


curl \
	-H 'Content-Type: application/json' \
	-H 'X-VTEX-API-AppKey: vtexappkey-alvicl-HQVROI' \
	-H 'X-VTEX-API-AppToken: KOGSPRUUOHLRCSALHEZEZXKGATTXAZCKACHRHHYCCGFDCNVOMNAXFISMDZSWXXTPFAQZLIDAFXCTSHENXEKNZFFSKVOIPCEENQYBXWDDJARHGZTWVEYTNFQZVYOPUVKC' \
    https://alvicl.vtexcommercestable.com.br/api/dataentities/CL/search?_fields=firstName,lastName,email,document,phone,corporateName&_from=0&_to=500&_keyword=corporateName=&