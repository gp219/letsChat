import React, { useState, useEffect } from 'react';
import AuthService from '../services/AuthService'; // Import AuthService
import styles from './MasterLayout.module.css'; // Import CSS Module

const MasterLayout = () => {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await AuthService.profile();
        if (response) {
          // Login successful, navigate to desired route (e.g., chat)
          // navigate('/chat');
          console.log("success" , response);
          setProfileData(response.data);
        } else {
          // Handle login failure (e.g., display error message)
          console.error('somethings wrong');
        }
      } catch (error) {
        console.error('Error during login:', error);
      }
    };

    fetchProfile();
  }, [])

  return (
    <div className={styles.masterLayout}>
      <header>
        <h1>My Website</h1>
        </header>

        <aside>
          <h2>Profile</h2>
          {profileData ? (
            <ul>
              <li>Name: {profileData.name}</li>
              <li>Email: {profileData.email}</li>
            </ul>
          ) : (
            <p>Loading profile...</p>
          )}
        </aside>

      <main>
        <p>This is the main content area of the website.</p>
      </main>
    </div>    
  );
};

export default MasterLayout;

