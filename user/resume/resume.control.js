import express from "express";
import ResumeModel from './resume.schema.js'
import fetchuser from "../../middleware/fetchuser.js";

const router = express.Router();

router.get('/receive', async (req, res) => {
    try {
        const projects = await ResumeModel.find();
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET one project by ID
//   router.get('/projects/:id', async (req, res) => {
//     const { id } = req.params;
//     try {
//       const project = await ResumeModel.findById(id);
//       if (!project) {
//         return res.status(404).json({ message: 'Project not found' });
//       }
//       res.json(project);
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   });


router.post('/create-dummy', fetchuser, async (req, res) => {
    try {
        const { users, projects, experiences, educations, skills } = req.body;
        const userId = req.user.id
        const dummy = new ResumeModel({ userId, users, projects, experiences, educations, skills });
        await dummy.save();
        return res.status(201).send({ message: "User created" });
    }
    catch (error) {
        return res.status(500).send({ message: `Error creating user: ${error.message}` });
    }
});

// POST create a new project
// router.post('/upload/users', fetchuser, async (req, res) => {
//     try {
//         const newResume = new ResumeModel({
//             userId: req.user.id,
//             users: req.body
//         });
//         await newResume.save();
//         res.status(201).send("ok");
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// });



// router.post('/upload/users', async (req, res) => {
//     try {
//         const portfolio = await ResumeModel.findById(req.body.portfolioId);
//         console.log(req.body);
//         if (!portfolio) return res.status(404).json({ message: 'Portfolio not found' });
//         delete req.body.user._id;
//         portfolio.users = req.body.user; // Assuming req.body.user contains a single user object
//         await portfolio.save();
//         res.status(201).json(portfolio);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// });


// POST route for experiences
// router.post('/upload/workExperiences', fetchuser, async (req, res) => {
//     try {
//         console.log(req.body);

//         // Destructure data from req.body
//         const { Position, Company, StartDate, EndDate } = req.body[0];

//         // Logging to verify the extracted fields
//         console.log(Position);
//         console.log(Company);
//         console.log(StartDate);
//         console.log(EndDate);

//         // Update the user's resume by pushing the new work experience
//         const result = await ResumeModel.updateOne(
//             { userId: req.user.id }, // Filter by userId from the fetchuser middleware
//             { $push: { workExperience: { Position, Company, StartDate, EndDate } } } // Push new work experience
//         );

//         // Check if the update was successful and respond accordingly
//         if (result.modifiedCount > 0) {
//             res.status(200).json({ message: 'Work experience added successfully!' });
//         } else {
//             res.status(404).json({ message: 'User resume not found!' });
//         }
//     } catch (error) {
//         // Handle errors and send a response with the error message
//         res.status(400).json({ message: error.message });
//     }
// });

router.post('/upload/workExperiences/:Id', async (req, res) => {
    try {
        const id = req.params.Id;
        const portfolio = await ResumeModel.findById(id);
        if (!portfolio) return res.status(404).json({ message: 'Resume not found' });
        delete req.body._id;
        portfolio.workExperience.push(req.body); // Assuming req.body.experience contains a single experience object
        await portfolio.save();
        res.status(201).json(portfolio);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


// POST route for educations
router.post('/upload/educations/:Id', async (req, res) => {
    const id = req.params.Id;
    try {
        const resume = await ResumeModel.findById(id);
        if (!resume) return res.status(404).json({ message: 'resume not found' });
        delete req.body._id;
        resume.educations.push(req.body); // Assuming req.body.education contains a single education object
        await resume.save();
        res.status(201).json(resume);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


router.post('/upload/strength/:Id', async (req, res) => {
    const id = req.params.Id;
    try {
        const resume = await ResumeModel.findById(id);
        if (!resume) return res.status(404).json({ message: 'resume not found' });
        delete req.body._id;
        resume.strength.push(req.body); // Assuming req.body.education contains a single education object
        await resume.save();
        res.status(201).json(resume);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// POST route for projects

router.post('/upload/projects', async (req, res) => {
    try {
        // const resume = await ResumeModel.findById(req.body.resumeId);
        // if (!resume) return res.status(404).json({ message: 'resume not found' });
        // resume.projects.push(req.body.project); // Assuming req.body.project contains a single project object
        // await resume.save();
        // res.status(201).json(resume);
        const newResume = new ResumeModel({
            userId: req.user.id,
            users: req.body
        });
        await newResume.save();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});



router.post('/upload/projects', async (req, res) => {
    try {
        const portfolio = await ResumeModel.findById(req.body.portfolioId);
        if (!portfolio) return res.status(404).json({ message: 'Portfolio not found' });
        delete req.body.project._id;
        portfolio.projects.push(req.body.project); // Assuming req.body.project contains a single project object
        await portfolio.save();
        res.status(201).json(portfolio);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


// POST route for skills
router.post('/upload/skills/:Id', async (req, res) => {
    const id = req.params.Id;
    try {
        const resume = await ResumeModel.findById(id);
        if (!resume) return res.status(404).json({ message: 'resume not found' });
        delete req.body._id;
        console.log(req.body);

        resume.skills.push(req.body); // Assuming req.body.skill contains a single skill object
        await resume.save();
        res.status(201).json(resume);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


// PUT update a project by ID
const updateresumeItem = async (req, res, item) => {
    const { id } = req.params;
    try {
        const updateQuery = {};
        updateQuery[`${item}.$`] = req.body;
        const updatedItem = await ResumeModel.updateOne(
            { [`${item}._id`]: id },
            { $set: updateQuery },
            { new: true }
        );
        if (!updatedItem) {
            return res.status(404).json({ message: `${item} not found` });
        }
        res.json(updatedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};



router.put('/users/:id', async (req, res) => {
    const userId = req.params.id; // The user ID from the URL parameter
    try {
        // Find the portfolio that contains this user
        const portfolio = await ResumeModel.findOne({ 'users._id': userId });

        if (!portfolio) {
            return res.status(404).json({ message: 'User not found in portfolio' });
        }

        // Update the user object within the portfolio's users field
        portfolio.users = {
            ...portfolio.users,
            ...req.body, // Merge updated user data from request body
        };

        // Save the updated portfolio
        const updatedPortfolio = await portfolio.save();
        res.json(updatedPortfolio);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(400).json({ message: error.message });
    }
});


const updatePortfolioItem = async (req, res, item) => {
    const { id } = req.params;
    try {
        let updateQuery = {};
        let queryCondition = {};

        // For arrays like 'projects', 'experiences', etc.
        updateQuery[`${item}.$`] = req.body;  // Use positional operator for arrays
        queryCondition = { [`${item}._id`]: id };  // Match array item by its _id

        const updatedItem = await ResumeModel.updateOne(
            queryCondition,
            { $set: updateQuery },
            { new: true }
        );

        if (updatedItem.modifiedCount === 0) {
            return res.status(404).json({ message: `${item} not found or no changes made` });
        }

        res.json(updatedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};




// Routes
// router.put('/users/:id', (req, res) => updateresumeItem(req, res, 'users'));
// router.put('/projects/:id', (req, res) => updateresumeItem(req, res, 'projects'));
// router.put('/experiences/:id', (req, res) => updateresumeItem(req, res, 'experiences'));
// router.put('/educations/:id', (req, res) => updateresumeItem(req, res, 'educations'));
// router.put('/skills/:id', (req, res) => updateresumeItem(req, res, 'skills'));


router.put('/projects/:id', (req, res) => updatePortfolioItem(req, res, 'projects'));
router.put('/workExperiences/:id', (req, res) => updatePortfolioItem(req, res, 'workExperience'));
router.put('/educations/:id', (req, res) => updatePortfolioItem(req, res, 'educations'));
router.put('/skills/:id', (req, res) => updatePortfolioItem(req, res, 'skills'));



// DELETE a project by ID
router.delete('/projects/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedProject = await ResumeModel.findByIdAndDelete(id);
        if (!deletedProject) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.json({ message: 'Project deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
export default router;