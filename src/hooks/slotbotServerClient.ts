import axios from 'axios';
import {getBackendUrl} from '../utils/urlHelper';
import {showNotification} from '@mantine/notifications';

const slotbotServerClient = axios.create({
	baseURL: getBackendUrl(),
	withCredentials: true,
});

// Workaround https://github.com/axios/axios/pull/6028: Attach XSRF token to requests
slotbotServerClient.interceptors.request.use((config) => {
	if (config.url?.startsWith('/')) { // Only attach XSRF token to relative URLs
		const token = readCookie(config.xsrfCookieName ?? 'XSRF-TOKEN');
		if (token) {
			config.headers[config.xsrfHeaderName ?? 'X-XSRF-TOKEN'] = token;
		}
	}
	return config;
});

/**
 * @see node_modules/axios/lib/helpers/cookies.js
 */
function readCookie(name: string): string | null {
	const match = new RegExp('(^|;\\s*)(' + name + ')=([^;]*)').exec(document.cookie);
	return match ? decodeURIComponent(match[3]) : null;
}

slotbotServerClient.interceptors.response.use(
	(response) => {
		if (response.data === 'This session has been expired (possibly due to multiple concurrent logins being attempted as the same user).') {
			window.location.replace('/session-expired');
		}
		return response;
	},
	(error) => {
		if (error.response) {
			// The request was made and the server responded with a status code
			// that falls out of the range of 2xx
			if (error.response.status === 404) {
				window.location.replace('/404');
			}
			if (error.response.status === 403) {
				window.location.replace('/403');
			}
			console.error(error.response.data);
			console.error(error.response.headers);
			return Promise.reject({
				message: error.response.data.errorMessage,
			});
		} else if (error.request) {
			// The request was made but no response was received
			// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
			// http.ClientRequest in node.js
			console.error(error.request);
		} else {
			// Something happened in setting up the request that triggered an Error
			console.error(error.message);
		}
		return Promise.reject(error);
	},
);
export default slotbotServerClient;

export function voidFunction() {
	/*Do nothing*/
}
