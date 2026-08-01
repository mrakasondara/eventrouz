const historyKey = "SEARCH-HISTORY";

interface SearchHistory {
  id: number;
  url: string;
  title: string;
}

export class SearchDialogHistory {
  static addToHistory(searchHistory: SearchHistory) {
    if (!this.checkIsStorageAvailable()) {
      return false;
    }

    const raw = localStorage.getItem(historyKey);
    const history = raw ? JSON.parse(raw) : [];

    history.push(searchHistory);

    const stringHistory = JSON.stringify(history);

    return localStorage.setItem(historyKey, stringHistory);
  }
  static deleteAllFromHistory() {
    if (!this.checkIsStorageAvailable()) {
      return false;
    }

    return localStorage.setItem(historyKey, "[]");
  }
  static deleteFromHistory(id: number) {
    if (!this.checkIsStorageAvailable()) {
      return false;
    }
    const raw = localStorage.getItem(historyKey);
    const history = raw ? JSON.parse(raw) : [];

    const removeHistory = history.filter(
      (item: SearchHistory) => item.id != id
    );
    const stringHistory = JSON.stringify(removeHistory);

    return localStorage.setItem(historyKey, stringHistory);
  }
  static getHistory() {
    if (!this.checkIsStorageAvailable()) {
      return false;
    }
    const raw = localStorage.getItem(historyKey);
    const history = raw ? JSON.parse(raw) : [];

    return history;
  }

  static checkIsStorageAvailable() {
    const test = "test";
    try {
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }
}
