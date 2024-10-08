const config = {
    env: import.meta.env.VITE_ENV,
    // API_BASE_URL : import.meta.env.VITE_REACT_APP_API_BASE_URL,
    // LA URL DE ABAJO NO SIRVE MAS PORQUE TIENE QUE CONSULTAR A LA API DEL PANEL http://localhost:8080/api-store
    API_BASE_URL : 'http://localhost:8080/api',
    back_legacy_panel_url_prod: import.meta.env.VITE_BACK_LEGACY_PANEL_URL_PROD,
    back_legacy_panel_url_dev: import.meta.env.VITE_BACK_LEGACY_PANEL_URL_DEV
    // API_BASE_URL: 'https://backend-bay-seven.vercel.app/api'
}

export default config