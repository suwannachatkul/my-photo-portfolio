export function setCookie(name: string, value: string, expireIn: number): void {
    const now = new Date();
    now.setTime(now.getTime() + expireIn);

    const expires = "expires=" + now.toUTCString();
    document.cookie = `${name}=${value}; ${expires}; path=/`;
}

export function getCookie(cookieName: string): string | undefined {
    const cookieKey = cookieName + "=";
    const cookieArray = document.cookie.split(';');

    for(let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i].trim();
        if (cookie.startsWith(cookieKey)) {
            return cookie.substring(cookieKey.length);
        }
    }

    return undefined;
}

export function deleteCookie(name: string): void {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
}
