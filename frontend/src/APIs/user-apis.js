export const GETUserInfoAction = async (account, token) => {
    if (!account || !token) {
        return { status: "fail" };
    }
    // const storedToken = localStorage.getItem('token');
    const response = await fetch("/api/v1/users/" + account, {
        method: "GET",
        headers: {
            Authorization: token,
        },
    });
    if (!response.status || response.status === "error") {
        throw new Error("Something went wrong!");
    }
    const data = await response.json();
    //   console.log(data);
    return data;
};