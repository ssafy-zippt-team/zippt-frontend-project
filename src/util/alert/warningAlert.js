import Swal from "sweetalert2";

export function warning(message) {
  Swal.fire({
    title: "Warning",
    text: message,
    icon: "warning",
  });
}
