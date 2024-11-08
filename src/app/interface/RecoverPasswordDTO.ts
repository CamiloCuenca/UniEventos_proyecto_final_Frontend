export interface RecoverPasswordDTO{
    code: string,
    newPassword: string,
    confirmationPassword: string
}