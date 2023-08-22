export const baseUrl = "https://apionline.ant-edu.ai/api/"

export const getHeaderAuth = (token: string) => {
	return { 
		'Content-Type' : 'application/json',
		'Authorization': 'Bearer ' + token
	}
}

export const fetchData = async (path: string, token: string, method: string) => {
	const headers = getHeaderAuth(token)
	const data = { 
		method: method, 
		headers: headers
	}
	
	const request = await fetch(
		baseUrl + path,
		data
	)

	if (!request.ok) {
		window.location.assign('https://ant-edu.ai/auth/login')

		// debug only
		// console.log('please login again')
		return null
	}
	
	return request.json()
}

export const postData = async (path: string, token: string, body: object = {}) => {
	const headers = getHeaderAuth(token)
	const data = { 
		method: "POST", 
		headers: headers,
		body: JSON.stringify(body)
	}
	
	const request = await fetch(
		baseUrl + path,
		data
	)

	if (!request.ok) {
		window.location.assign('https://ant-edu.ai/auth/login')
		// console.log('please login again')
		return null
	}
	
	return request.json()
}