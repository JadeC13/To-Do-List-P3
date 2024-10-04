import React from 'react';

const sections = [
    {
        title: 'Manage Your Tasks',
        text:
            'Our task manager allows you to create and manage tasks with ease. You can add standalone tasks or organize them into folders, helping you stay on top of your to-do list. All tasks are stored locally in your browser for quick access.'
    },
    {
        title: 'User Authentication',
        text:
            'We use MongoDB to securely handle user signups and logins, ensuring your credentials are protected. Task data is managed locally and not stored in the database.'
    }

];

function Home() {
    return (
        <div className="home-page">
            <h1>WELCOME!!!</h1>
            <a href="/tasks">View and manage your tasks!</a>

            {sections.map((section, index) => (
                <div key={index} className="section">
                    <h2>{section.title}</h2>
                    <p>{section.text}</p>
                </div>
            ))}

            <a href="/signup">
                <button className="btn-primary">Sign Up to Manage Tasks</button>
            </a>
        </div>
    );
}

export default Home;