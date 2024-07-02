const Zygot = {'url':'http://localhost','port':null,'routes':{'/':{'methods':['GET'],'uri':'/'}},'defaults':{'locale':'en','supportedLocales':['fr','en'],'throwOnUnavailable':false}};

if (typeof window !== 'undefined' && typeof window.Zygot !== 'undefined') {
    Object.assign(Zygot.routes, window.Zygot.routes)
}

export { Zygot }
