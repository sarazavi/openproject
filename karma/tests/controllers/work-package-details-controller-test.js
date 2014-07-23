//-- copyright
// OpenProject is a project management system.
// Copyright (C) 2012-2014 the OpenProject Foundation (OPF)
//
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License version 3.
//
// OpenProject is a fork of ChiliProject, which is a fork of Redmine. The copyright follows:
// Copyright (C) 2006-2013 Jean-Philippe Lang
// Copyright (C) 2010-2013 the ChiliProject Team
//
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License
// as published by the Free Software Foundation; either version 2
// of the License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program; if not, write to the Free Software
// Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
//
// See doc/COPYRIGHT.rdoc for more details.
//++

/*jshint expr: true*/

describe('WorkPackageDetailsController', function() {
  var scope;
  var buildController;
  var I18n = { t: angular.identity },
      WorkPackagesHelper = {
        formatWorkPackageProperty: angular.identity
      },
      UserService = {
        getUser: angular.identity
      },
      CustomFieldHelper = {
        formatCustomFieldValue: angular.identity
      },
      workPackage = {
        props: {
          status: 'open',
          versionName: null,
          customProperties: [
            { format: 'text', name: 'color', value: 'red' },
          ]
        },
        embedded: {
          activities: [],
          watchers: [],
          attachments: [],
          relations: [
            {
              props: {
                _type: "Relation::Relates"
              },
              links: {
                relatedFrom: {
                  fetch: sinon.spy()
                },
                relatedTo: {
                  fetch: sinon.spy()
                }
              }
            }
          ]
        },
        links: {
          self: "it's a me, it's... you know...",
          availableWatchers: {
            fetch: function() { return {then: angular.noop}; }
          }
        },
        link: {
          addWatcher: {
            fetch: function() { return {then: angular.noop}; }
          }
        },
      };

  function buildWorkPackageWithId(id) {
    angular.extend(workPackage.props, {id: id});
    return workPackage;
  }

  beforeEach(module('openproject.api', 'openproject.services', 'openproject.workPackages.controllers'));
  beforeEach(inject(function($rootScope, $controller, $timeout) {
    var workPackageId = 99;

    buildController = function() {
      scope = $rootScope.$new();

      ctrl = $controller("WorkPackageDetailsController", {
        $scope:  scope,
        $stateParams: { workPackageId: workPackageId },
        latestTab: {},
        I18n: I18n,
        ConfigurationService: {
          commentsSortedInDescendingOrder: function() {
            return false;
          }
        },
        WorkPackagesDetailsHelper: {
          attachmentsTitle: function() { return ''; }
        },
        workPackage: buildWorkPackageWithId(workPackageId),
      });

      $timeout.flush();
    };

  }));

  describe('initialisation', function() {
    it('should initialise', function() {
      buildController();
    });
  });

  describe('work package properties', function() {
    describe('relations', function() {
      beforeEach(function() {
        buildController();
      });

      it('Relation::Relates', function() {
        expect(scope.relatedTo.length).to.eq(1);
      });
    });
  });


});
