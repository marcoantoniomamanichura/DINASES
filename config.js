module.exports = {
    port: process.env.PORT || 8080,
    db: process.env.MSSQL || {server: 'localhost',
                              database: 'BDDistBHFPrueba',
                              user: 'sisdisoft',
                              password: 'Bi0petr01*2017Disoft',
                              port: 1433},
    SECRET_TOKEN:'8caeM5V+HGJgzIHdPy68eBdMLZ6H1TNYqAX0rgRLauvYO0Z9KG/fuNQVumsEbYrNi5wkKKKZArUpTks5s3SiUg'
}
