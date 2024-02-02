# GeoQuiz

This project is a website that hosts a few geography quiz games and
allows users to create accounts that will save their scores. There
are three quizzes as of now, more are to be added in the future.

## Description

The first quiz shows players rotated silhouettes of countries one at 
a time and has players guess the country by name. The second quiz 
shows players a world map, the game selects a random country as the 
target. The player's goal is to play hot and cold, guessing 
countries, until they find the target. Each wrong guess colors the 
guessed country based on its distance from the target on a gradient 
from blue (far) to red (near). When the target is guessed, all 
countries are colored in and the game ends. The third quiz is an 
island identification game for the Malay archipelago. Players have 
the option of picking one of five difficulties and a mode of play, 
clicking or typing. The difficulty options choose an area threshold, 
excluding smaller islands from play. The clicking mode gives the 
player the name of islands, one at a time, requiring them to click 
on that island. If they click the correct island, it fills in green, 
if they skip, it fills in red. Ending the quiz early fills in all 
unidentified islands with red. The typing mode simply allows players 
to type any island in play in any order, filling in guessed islands 
with green. 

Users of the site also have the option of creating an account and 
logging in to keep track of their scores and get put on the leader 
board. Users are authenticated using jsonwebtoken, making sure they 
can only manipulate their own accounts.

This has been a passion project that I have been working on bit by 
bit for a while. I have developed early versions of the quizzes as 
stand-alone apps using Java and C++. I combined them into a website, 
rewriting the projects in JavaScript, as part of a school project. 
Since then, I have continued development, including rewriting much 
of the code to improve design and function and adding another quiz.

## Dependencies

mongoose - api for MongoDB database

express - web framework for nodejs

dotenv - securely store environment variables

cors - express middleware

body-parser - request body parsing middleware

bcrypt - encrypt information, ie passwords

jsonwebtoken - expirable tokens for authentication

validator - library for string validation

is-empty - checks for empty values

cloudinary - api for cloudinary database

## References and Resources

A MERN stack project totorial: https://youtube.com/playlist?list=PLKhlp2qtUcSYC7EffnHzD-Ws2xG-j3aYo

Repo for above tutorial: https://github.com/piyush-eon/notezipper

Repo for a previous MERN project: https://github.com/AdrikGG/sendit

Cloudinary tutorial: https://www.youtube.com/watch?v=FsD_gUbYsb8&ab_channel=CODINGACADEMY
