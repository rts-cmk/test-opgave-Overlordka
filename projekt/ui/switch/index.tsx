export default function Switch({ name, label, checked = false, disabled = false }: { name: string, label: string, checked?: boolean, disabled?: boolean }) {
    
    return (
        <>
            <input id={name} type="checkbox" name={name} className="peer sr-only" defaultChecked={checked} disabled={disabled} />

            <label
                htmlFor={name}
                className="
                    relative before:bg-gray-300 peer-checked:before:bg-green-600 before:absolute before:w-12 
                    before:h-6 before:rounded-full after:absolute after:w-5 after:h-5 after:bg-gray-50 
                    after:rounded-full after:top-px after:transition-all after:left-0.5 
                    peer-checked:after:left-6.5
                "
            >
                <span className="ml-14">{label}</span>
            </label>
        </>
    );
}