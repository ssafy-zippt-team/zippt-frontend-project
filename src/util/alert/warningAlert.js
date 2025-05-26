import Swal from "sweetalert2";

export function warning(message) {
  Swal.fire({
    title: "Warning",
    text: message,
    confirmButtonText: "확인",
    confirmButtonColor: "#115C5E",
    icon: "warning",
  });
}
