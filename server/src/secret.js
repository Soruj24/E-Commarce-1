require('dotenv').config()

const port = process.env.PORT || 3000
const mongodb_url = process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/e-commerce"
const jwtAccessKey = process.env.ACCESS_TOKEN_SECRET || "56756u458674605439urtrty8t345j489439i454iut497t84054tkrt34"
const jwtRefreshKey = process.env.REFRESH_TOKEN_SECRET || "f8rut4908t3-4054it87-60=35o343ri3948774353845893584TI95UTIGJIR"


module.exports = { port, mongodb_url, jwtAccessKey, jwtRefreshKey }