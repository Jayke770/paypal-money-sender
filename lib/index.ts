import fetch from 'node-fetch'
export default class Paypal {
    apiUrl = { live: 'https://api-m.paypal.com', sandbox: 'https://api-m.sandbox.paypal.com' }
    mode: mode = 'live'
    credentials: Credentials = {}
    private credentialsData: credentialsData = { clientSecret: '', clientId: '' }
    constructor({ clientSecret, clientId, mode }: PaypalConstructor) {
        this.credentialsData.clientSecret = clientSecret
        this.credentialsData.clientId = clientId
        this.mode = mode || 'sandbox'
    }
    onGetCredentials(): credentialsData {
        return this.credentialsData
    }
    Autheticate() {
        return new Promise(async (resolve, reject) => {
            await fetch(`${this.apiUrl[this.mode]}/v1/oauth2/token`, {
                method: 'POST',
                body: "grant_type=client_credentials",
                headers: {
                    Authorization: `Basic ${Buffer.from(`${this.credentialsData.clientId}:${this.credentialsData.clientSecret}`).toString('base64')}`,
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(async req => {
                const res = await req.json()
                this.credentials = res
                resolve(res)
            }).catch(e => reject(e))
        }) as Promise<Credentials>
    }
    sendPayment(data: SendMoney) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!this.credentialsData) throw new Error("ClientID and ClientSecret is required")
                if (!this.credentials) throw new Error("Run Authenticate() first before Payments")
                await fetch(`${this.apiUrl[this.mode]}/v1/payments/payouts`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${this.credentials.token_type} ${this.credentials.access_token}`
                    },
                    body: JSON.stringify(data)
                }).then(async req => {
                    const res = await req.json()
                    resolve(res)
                })
            } catch (e) {
                reject(e)
            }
        }) as Promise<SendMoneyResponse>
    }
}