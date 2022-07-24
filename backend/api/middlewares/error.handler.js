module.exports = (_req, res, err) => {
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).json({ name: err.name, message: err.message });
}