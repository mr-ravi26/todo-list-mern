const dev = {
    env: {
        api_url: "http://ec2-3-21-102-190.us-east-2.compute.amazonaws.com/",
    }
};

const prod = {
    env: {
        api_url: "http://ec2-3-21-102-190.us-east-2.compute.amazonaws.com/",
    }
};

const Currentconfig =
    process.env.NODE_ENV === "production"
        ? prod
        : dev

export default {
    enableAnimatedRoute: false,
    ...Currentconfig.env
}