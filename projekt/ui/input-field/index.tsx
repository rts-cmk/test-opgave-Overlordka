export default function InputField(
	{ label, type, name, placeholder, status, value }:
		{ value?: string, label: string, type: React.HTMLInputTypeAttribute, name: string, placeholder?: string, status?: string[] }
) {
	return (
		<div>
			<label>
				<span>{label}</span>
				<input 
                type={type} 
                name={name} 
                defaultValue={value} 
                placeholder={placeholder} 
                className={`border px-3 py-y ${Boolean(status) ? "border-red-500" : "border-grey-100"} rounded-md`}
                aria-invalid={Boolean(status)}
                aria-labelledby={Boolean(status) ? `${name}_statusMessage` : undefined}
                />
			</label>
			{Boolean(status) && <p id={`${name}_statusMessage`} role="alert">
                {status?.map((message, index) => (
                <span id="statusMessage" className="text-red-500" key={`${message}_${index}`}>
                    {message}
                </span>
            ))}
            </p>}
		</div>
	);
}