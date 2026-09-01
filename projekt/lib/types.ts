export type Asset = {
	url: string;
	height: number;
	width: number;
};

export type Animal = {
	id: number;
	name: string;
	description: string;
	age: number;
	asset: Asset;
};

export type AnimalResult = {
	success: true;
	animal: Animal;
} | {
	success: false;
	message: string;
};

export type AnimalResultList = {
	success: true;
	animals: Animal[];
} | {
	success: false;
	message: string;
};

export type LoginError = {
	username?: { errors: string[] };
	password?: { errors: string[] };
	general?: { errors: string[] };
};

export type LoginData = {
	username?: string;
	password?: string;
};

export type LoginFormState = {
	error?: LoginError;
	data?: LoginData;
};

export type AuthResponse = {
	success: false;
	message: string;
} | {
	success: true;
	result: {
		userId: string | number;
		token: string;
		validUntil: number;
	}
}

