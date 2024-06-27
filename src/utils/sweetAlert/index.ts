import Swal from "sweetalert2";

export const showErrorsMessage = (message: string, outsideClick = true) => {
  return Swal.fire({
    title: "Oppss...",
    html: `<p class="text-foreground/50 text-base">${message}</p>`,
    icon: "error",
    buttonsStyling: false,
    allowOutsideClick: outsideClick,
    customClass: {
      confirmButton: "h-9 rounded-md px-8 bg-primary text-primary-foreground",
      popup: "bg-background max-w-[90%]",
    },
  });
};

export const showSuccessMessage = (message: string) => {
  return Swal.fire({
    title: "Successful",
    html: `<p class="text-foreground/50 text-base">${message}</p>`,
    icon: "success",
    showConfirmButton: false,
    timer: 3000,
    customClass: {
      popup: "bg-background max-w-[90%]",
    },
  });
};

export const showSuccessMessageWithButton = (message: string) => {
  return Swal.fire({
    title: "Successful",
    html: `<p class="text-foreground/50 text-base">${message}</p>`,
    icon: "success",
    buttonsStyling: false,
    customClass: {
      confirmButton: "h-9 rounded-md px-8 bg-primary text-primary-foreground",
      popup: "bg-background max-w-[90%]",
    },
  });
};
