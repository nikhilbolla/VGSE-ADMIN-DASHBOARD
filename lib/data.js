import { connectMongoDB } from './mongodb';
import Faculty from '@/models/faculty'
import Event from '@/models/event';
import Notice from '@/models/noticeboard';
import Cover from '@/models/cover';

export const fetchFaculty = async () => {
  try {
   
    connectMongoDB();
    const faculty = await Faculty.find();
    return faculty;
  } catch (error) {
    console.log(error);
  }
}

export const fetchEvents = async () => {
  try {
    connectMongoDB();
    const events = await Event.find();
    return events;
  } catch (error) {
    console.log(error);
  }
}

export const fetchNotices = async () => {
  try {
    connectMongoDB();
    const notices = await Notice.find();
    return notices;
  } catch (error) {
    console.log(error);
  }
}

export const fetchCover = async () => {
  try {
    connectMongoDB();
    const cover = await Cover.find();
    return cover;
  } catch (error) {
    console.log(error);
  }
}