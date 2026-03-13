(function () {
  var tourData = window.TOUR_SEARCH_DATA || [];
  var destinationKeywords = {
    "Yangon": ["yangon"],
    "Mandalay": ["mandalay"],
    "Bagan": ["bagan"],
    "Inle Lake": ["inle lake", "inle"],
    "Golden Rock": ["golden rock", "kyaikhtiyo"],
    "Beach": ["beach", "ngapali", "ngwe saung", "ngwesaung", "chaung tha", "kawthaung", "myeik"]
  };

  function normalizeText(value) {
    return (value || "")
      .toString()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, " ")
      .trim();
  }

  function durationKey(value) {
    var numbers = (value || "").toString().match(/\d+/g);
    return numbers ? numbers.join("-") : "";
  }

  function getFiltersFromForm() {
    return {
      arriveDate: document.getElementById("arrival-date").value.trim(),
      tourType: document.getElementById("tour_type").value,
      dest: document.getElementById("dest").value,
      duration: document.getElementById("duration").value
    };
  }

  function setValue(id, value) {
    var element = document.getElementById(id);
    if (element && value !== null) {
      element.value = value;
    }
  }

  function readFiltersFromUrl() {
    var params = new URLSearchParams(window.location.search);
    return {
      arriveDate: params.get("arrive_date") || "",
      tourType: params.get("tour_type") || "",
      dest: params.get("dest") || "",
      duration: params.get("duration") || ""
    };
  }

  function writeFiltersToUrl(filters) {
    var params = new URLSearchParams();

    if (filters.arriveDate) {
      params.set("arrive_date", filters.arriveDate);
    }
    if (filters.tourType) {
      params.set("tour_type", filters.tourType);
    }
    if (filters.dest) {
      params.set("dest", filters.dest);
    }
    if (filters.duration) {
      params.set("duration", filters.duration);
    }

    var nextUrl = "search_tours.html";
    var queryString = params.toString();
    if (queryString) {
      nextUrl += "?" + queryString;
    }

    window.history.replaceState({}, "", nextUrl);
  }

  function matchesDestination(item, selectedDestination) {
    if (!selectedDestination) {
      return true;
    }

    var haystack = normalizeText(item.title + " " + item.route);
    var keywords = destinationKeywords[selectedDestination] || [selectedDestination];

    return keywords.some(function (keyword) {
      return haystack.indexOf(normalizeText(keyword)) !== -1;
    });
  }

  function filterTours(filters) {
    return tourData.filter(function (item) {
      var sameTourType = !filters.tourType || item.tourType === filters.tourType;
      var sameDuration = !filters.duration || durationKey(item.duration) === durationKey(filters.duration);
      var sameDestination = matchesDestination(item, filters.dest);

      return sameTourType && sameDuration && sameDestination;
    });
  }

  function escapeHtml(value) {
    return (value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function renderSummary(filters, results) {
    var summary = document.getElementById("results-summary");
    var title = document.getElementById("results-title");
    var parts = [];

    if (filters.tourType) {
      parts.push(filters.tourType);
    }
    if (filters.dest) {
      parts.push(filters.dest);
    }
    if (filters.duration) {
      parts.push(filters.duration);
    }
    if (filters.arriveDate) {
      parts.push("Arrival " + filters.arriveDate);
    }

    title.textContent = results.length + " tour" + (results.length === 1 ? "" : "s") + " found";
    summary.textContent = parts.length ? "Filters: " + parts.join(" | ") : "Showing all available package tours.";
  }

  function renderResults(results) {
    var container = document.getElementById("search-results");
    var emptyState = document.getElementById("empty-state");

    if (!results.length) {
      container.innerHTML = "";
      emptyState.hidden = false;
      return;
    }

    emptyState.hidden = true;
    container.innerHTML = results.map(function (item) {
      return [
        '<div class="col-md-6 col-lg-4 marginbot-30">',
        '  <div class="search-card">',
        '    <img class="img-responsive search-card-image" src="' + escapeHtml(item.image) + '" alt="' + escapeHtml(item.title) + '">',
        '    <div class="search-card-body">',
        '      <div class="search-card-type">' + escapeHtml(item.tourType) + '</div>',
        '      <h3 class="search-card-title">' + escapeHtml(item.title) + '</h3>',
        '      <p class="search-card-meta"><strong>Route:</strong> ' + escapeHtml(item.route) + '</p>',
        '      <p class="search-card-meta"><strong>Duration:</strong> ' + escapeHtml(item.duration) + '</p>',
        '      <a class="btn btn-red" href="' + escapeHtml(item.href) + '">View Details</a>',
        '    </div>',
        '  </div>',
        '</div>'
      ].join("");
    }).join("");
  }

  function runSearch() {
    var filters = getFiltersFromForm();
    var results = filterTours(filters);

    writeFiltersToUrl(filters);
    renderSummary(filters, results);
    renderResults(results);
  }

  document.addEventListener("DOMContentLoaded", function () {
    var initialFilters = readFiltersFromUrl();
    var form = document.getElementById("tour-search-form");

    setValue("arrival-date", initialFilters.arriveDate);
    setValue("tour_type", initialFilters.tourType);
    setValue("dest", initialFilters.dest);
    setValue("duration", initialFilters.duration);

    if (window.jQuery && window.jQuery.fn.datepicker) {
      window.jQuery("#arrival-date").datepicker({
        format: "dd/mm/yyyy"
      });
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      runSearch();
    });

    runSearch();
  });
}());
