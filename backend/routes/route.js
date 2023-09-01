const router = require('express').Router();

const {
    adminRegister,
    adminLogIn,
    getAdminDetail
} = require('../controllers/adminController.js');

const {
    employeeRegister,
    employeeLogIn,
    getEmployeeDetail,
    findEmployee,
    getEmployees,
} = require('../controllers/employeeController.js');

const {
    taskCreate,
    taskDetailsbyAdmin,
    taskListbyAdmin,
    updateTaskbyAdmin,
    deleteTaskbyAdmin,
    deleteEmployeeTasksbyAdmin,
    deleteAllTasksbyAdmin,

    taskDetailsbyEmployee,
    taskListbyEmployee,
    updateTaskbyEmployee,
    deleteTaskbyEmployee,
    deleteEmployeeTasksbyEmployee,
} = require('../controllers/taskController.js');

const authMiddleware = require('../middleware/authMiddleware.js');

// Admin
router.post('/AdminRegister', adminRegister);
router.post('/AdminLogin', adminLogIn);
router.get('/Admin', authMiddleware, getAdminDetail);

router.get('/employeeDetails/:id', authMiddleware, findEmployee);
router.get('/employeeList', authMiddleware, getEmployees);

// Task By Admin
router.post('/taskCreate', authMiddleware, taskCreate);
router.get('/taskDetailsbyAdmin/:id', authMiddleware, taskDetailsbyAdmin);
router.get('/taskListbyAdmin/:id', authMiddleware, taskListbyAdmin);
router.put('/updateTaskbyAdmin/:id', authMiddleware, updateTaskbyAdmin);
router.delete('/deleteTaskbyAdmin/:id', authMiddleware, deleteTaskbyAdmin);
router.delete('/deleteEmployeeTasksbyAdmin/:id', authMiddleware, deleteEmployeeTasksbyAdmin);
router.delete('/deleteAllTasksbyAdmin', authMiddleware, deleteAllTasksbyAdmin);

// Employee
router.post('/EmployeeRegister', authMiddleware, employeeRegister);
router.post('/EmployeeLogin', employeeLogIn);
router.get('/Employee', authMiddleware, getEmployeeDetail);

// Task By Employee
router.get('/taskDetailsbyEmployee/:id', authMiddleware, taskDetailsbyEmployee);
router.get('/taskListbyEmployee', authMiddleware, taskListbyEmployee);
router.put('/updateTaskbyEmployee/:id', authMiddleware, updateTaskbyEmployee);
router.delete('/deleteTaskbyEmployee/:id', authMiddleware, deleteTaskbyEmployee);
router.delete('/deleteEmployeeTasksbyEmployee', authMiddleware, deleteEmployeeTasksbyEmployee);

module.exports = router;