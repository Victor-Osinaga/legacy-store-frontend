import toast from 'react-hot-toast';

export default async function toastCreateHandle({ toastId, msgSuccess, msgError }) {
    if (msgSuccess) {
        toast.success(
            <div>
                {msgSuccess}
            </div>,
            {
                id: toastId
            }
        );
    } else if (msgError) {
        toast.error(
            <div>
                <p><strong>ERROR</strong></p>
                {msgError}
            </div>,
            {
                id: toastId
            }
        );
    }
}