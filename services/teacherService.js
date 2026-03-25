/**
 * ---------------------------------------------------------
 * Service : teacherService.js
 * ---------------------------------------------------------
 * Rôle :
 *  - Gérer toutes les actions liées au rôle professeur
 *  - Récupérer classes, élèves, présences, notifications
 *  - Filtrer automatiquement par école (id_school)
 * ---------------------------------------------------------
 */

import apiClient from "./apiClient";
import authService from "./authService";

const teacherService = {
  /**
   * Récupère les classes associées à un enseignant.
   * Filtré automatiquement par école.
   */
  async getTeacherClasses(teacherId) {
    const schoolId = await authService.getSchoolId();

    const response = await apiClient.get(
      `/schools/${schoolId}/teachers/${teacherId}/classes`
    );

    return response.data.classes;
  },

  /**
   * Récupère les élèves d’une classe donnée.
   */
  async getClassChildren(classId) {
    const response = await apiClient.get(`/classes/${classId}/children`);
    return response.data.children;
  },

  /**
   * Récupère les présences d’une classe à une date donnée.
   */
  async getClassAttendance(classId, date) {
    const response = await apiClient.get(
      `/classes/${classId}/attendance`,
      { params: { date } }
    );

    return response.data.attendance;
  },

  /**
   * Récupère les notifications destinées à un enseignant.
   */
  async getTeacherNotifications(teacherId) {
    const response = await apiClient.get(
      `/teachers/${teacherId}/notifications`
    );

    return response.data.notifications;
  },

  /**
   * Marque la présence d’un élève.
   */
  async markAttendance(studentId, classId, present) {
    const response = await apiClient.post(`/attendance/mark`, {
      studentId,
      classId,
      present,
    });

    return response.data;
  },

  /**
   * Envoie une notification aux parents d’une classe.
   */
  async sendNotification(classId, title, message) {
    const response = await apiClient.post(`/notifications/send`, {
      classId,
      title,
      message,
    });

    return response.data;
  },
};

export default teacherService;
