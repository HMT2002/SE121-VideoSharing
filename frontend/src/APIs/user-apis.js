export const GETUserInfoAction = async (account, token) => {
    if (account == null || token == null) return { status: "fail" };

    const response = await fetch("/api/v1/users/" + account, {
        method: "GET",
        headers: {
            Authorization: token,
        },
    });

    if (response.status == null || response.status === "error") {
        throw new Error("Something went wrong!");
    }

    const data = await response.json();
    //   console.log(data);
    return data;
};

export const POSTUploadAvatarAction = async (formData) => {
    if (formData == null) return { status: "fail" };

    const response = await fetch("/api/v1/users/upload-image", {
        method: "POST",
        body: formData,
    });

    if (response.status == null || response.status === "error") {
        throw new Error("Something went wrong!");
    }

    const data = await response.json();
    //   console.log(data);
    return data;
};

const POSTUpdateUserInfo = async (account, token, payload) => {
    if (account == null || token == null) return { status: "fail" };

    const response = await fetch("/api/v1/users/" + account, {
        method: "PATCH",
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        },
    });

    if (response.status == null || response.status === "error") {
        throw new Error("Something went wrong!");
    }

    const data = await response.json();
    //   console.log(data);
    return data;
}

const UserAPIs = {
    GETUserInfoAction,
    POSTUploadAvatarAction,
    POSTUpdateUserInfo
}

export default UserAPIs;