export function getServerUrl() {
    if(process.env.NODE_ENV === "development") return "http://localhost:8080/";
    else return "https://portfolio-workshop-server.herokuapp.com/";
}