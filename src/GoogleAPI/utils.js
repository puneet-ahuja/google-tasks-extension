export const parseUser = user => {
    const { Qt : { 
                    SU: id,
                    Ad: fullName,
                    vW: firstName,
                    wU: lastName,
                    UK: imageUrl,
                    zu: email
                } = {} } = user
        return {
            id,
            fullName,
            firstName,
            lastName,
            imageUrl,
            email
        }
} 