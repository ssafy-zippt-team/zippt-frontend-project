import router from "@/router";
import Swal from "sweetalert2";

export function loginReq() {
  Swal.fire({
    title: "회원 전용 기능",
    text: "로그인 하시겠습니까?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#115C5E",
    cancelButtonColor: "#d33",
    confirmButtonText: "로그인",
    cancelButtonText : "아니요"
  }).then((result) => {
    if(result.isConfirmed) {
        router.push("/login")
    }
  });
}
