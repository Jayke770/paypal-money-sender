type SendMoneyRecipientTypes = 'EMAIL' | 'PHONE' | 'PAYPAL_ID'
interface SendMoney {
    items: {
        receiver: string,
        amount: {
            currency: "USD",
            value: string
        },
        recipient_type: SendMoneyRecipientTypes,
        note?: string,
        sender_item_id: string,
        recipient_wallet?: "PAYPAL" | "RECIPIENT_SELECTED",
        notification_language?: string,
        notification_language?: string,
        alternate_notification_method?: {
            phone: {
                country_code: string,
                national_number: string,
                extension_number: string
            }
        }
    }[],
    sender_batch_header: {
        sender_batch_id: string,
        email_subject: string,
        email_message: string
    }
}
interface SendMoneyResponse {
    batch_header: {
        sender_batch_header: {
            sender_batch_id: string,
            email_subject: string,
            email_message: string
        },
        payout_batch_id: string,
        batch_status?: "PENDING"
    },
    links?: {
        href: string,
        rel: 'self' | 'rel' | 'item',
        method: 'GET',
        encType: string
    }[]
}
type credentialsData = { clientId?: string, clientSecret?: string }
type mode = 'live' | 'sandbox'
interface PaypalConstructor extends credentialsData {
    mode?: mode
}
type Credentials = {
    scope?: string,
    access_token?: string,
    token_type?: 'Bearer',
    app_id?: string,
    expires_in?: number,
    nonce?: string
}