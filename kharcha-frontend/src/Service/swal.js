import Swal2 from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal2);



class Swal{
    static Swal = MySwal
    static fire = ({
        className,
        title, body, footer, 
        icon,
        didOpen, didClose, 
        
        preConfirm,preDeny,

        confirmButton,
        cancelButton,
        denyButton,
        closeButton,
        
        confirmButtonComponent,
        cancelButtonComponent,
        denyButtonComponent,

        reverseActions,
    })=>{
        
        return MySwal.fire({
            customClass: className? `myalert ${className}` : "myalert u-width-unset",
            
            title: title,
            html: body,
            footer: footer,
            icon: icon,
            didOpen: didOpen,
            didClose: didClose,

            preDeny: preDeny,
            preConfirm: preConfirm,

            reverseButtons: !!reverseActions,
            showConfirmButton: confirmButton,
            showCancelButton: cancelButton,
            showDenyButton: denyButton,
            showCloseButton: closeButton,

            confirmButtonText: confirmButtonComponent? confirmButtonComponent : denyButton? "Yes" : "Ok",
            cancelButtonText: cancelButtonComponent? cancelButtonComponent : "Cancel",
            denyButtonText: denyButtonComponent? denyButtonComponent : "No",
        })
    }
}

export default Swal;