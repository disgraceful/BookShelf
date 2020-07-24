import router from "../router/index";

export default function(request, next) {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user ? user.token : "";
  request.headers.set("X-Access-Token", token);
  next((response) => {
    if (response.status == 401) {
      console.log("401 detected! redirect!");
      router.push({ name: "login" });
    }
  });
}
