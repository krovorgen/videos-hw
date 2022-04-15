import { videos } from './db';

export const videosRepository = {
  getVideos() {
    return videos;
  },
  getVideoById(id: number) {
    return videos.find((item) => item.id === id);
  },
  deleteVideoById(id: number) {
    const index = videos.findIndex((item) => item.id === id);
    videos.splice(index, 1);

    return index !== -1;
  },
  updateVideoById(id: number, title: string) {
    const video = videos.find((item) => item.id === id);

    if (video) {
      video.title = title;
      return true;
    } else {
      return false;
    }
  },
  createVideo(title: string) {
    const newVideo = {
      id: +new Date(),
      title,
      author: 'it-incubator.eu',
    };
    videos.push(newVideo);
    return newVideo;
  },
};
