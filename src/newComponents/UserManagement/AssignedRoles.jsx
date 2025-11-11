import React, { useState, useEffect } from 'react';
import { FaEye } from 'react-icons/fa';

const AssignedRoles = () => {
  const [assignedRoles, setAssignedRoles] = useState([]);
  const [allRoles, setAllRoles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);

  useEffect(() => {
    const fetchAssignedRoles = async () => {
      try {
        const response = await fetch('http://localhost:4000/getassignedroles');
        const data = await response.json();
        console.log(data)
        setAssignedRoles(data);
      } catch (error) {
        console.error('Error fetching assigned roles:', error);
      }
    };

    const fetchAllRoles = async () => {
      try {
        const response = await fetch('http://localhost:4000/roles');
        const data = await response.json();
        setAllRoles(data);
      } catch (error) {
        console.error('Error fetching all roles:', error);
      }
    };

    fetchAssignedRoles();
    fetchAllRoles();
  }, []);

  const getSubRoleName = (subRole) => {
    if (!subRole) return 'Unknown Sub-role';

    if (typeof subRole === 'object' && subRole !== null) {
      return subRole.subRoleName || 'Unnamed Sub-role';
    }

    if (typeof subRole === 'string') {
      for (const role of allRoles) {
        if (!role.subRole) continue;
        const foundSubRole = role.subRole.find(sr => sr._id === subRole);
        if (foundSubRole) return foundSubRole.subRoleName || 'Unnamed Sub-role';
      }
    }

    return 'Unknown Sub-role';
  };

  const handleViewDetails = (admin) => {
    setSelectedAdmin(admin);
    setShowModal(true);
  };

  const renderModal = () => {
    if (!showModal || !selectedAdmin) return null;

    return (
      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>

          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Assigned Roles for: {selectedAdmin.fullName}
              </h3>

              <div className="space-y-4">
                {selectedAdmin.assignedRoles?.map((role, index) => (
                  <div key={index} className="border rounded-lg p-4 bg-gray-50">
                    <h4 className="font-semibold text-blue-700 mb-2">
                      Role: {role.roleId?.role || 'Unknown Role'}
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <strong>Companies:</strong>
                        <ul className="list-disc ml-6 mt-1">
                          {role.companyIds?.length > 0 ? (
                            role.companyIds.map((company) => (
                              <li key={company._id || company}>
                                {company.companyName || company || 'Unknown Company'}
                              </li>
                            ))
                          ) : (
                            <li>-</li>
                          )}
                        </ul>
                      </div>

                      <div>
                        <strong>Sub-Roles:</strong>
                        <ul className="list-disc ml-6 mt-1">
                          {role.roleId?.subRole?.length > 0 ? (
                            role.roleId.subRole.map((subRole) => (
                              <li key={subRole._id}>
                                {subRole.subRoleName || 'Unnamed Sub-role'}
                              </li>
                            ))
                          ) : role.subRoles?.length > 0 ? (
                            role.subRoles.map((subRole) => (
                              <li key={typeof subRole === 'string' ? subRole : subRole._id}>
                                {getSubRoleName(subRole)}
                              </li>
                            ))
                          ) : (
                            <li>-</li>
                          )}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-2">
                      <strong>Points:</strong>
                      <ul className="list-disc ml-6 mt-1">
                        {role.points?.length > 0 ? (
                          role.points.map((point, idx) => (
                            <li key={idx}>{point ?? '-'}</li>
                          ))
                        ) : (
                          <li>-</li>
                        )}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto mt-12 p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-6">Assigned Roles</h2>

      <table className="min-w-full table-auto border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2 text-left">Admin</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {assignedRoles.map((admin) => (
            <tr key={admin._id} className="even:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">{admin.fullName || '-'}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                <button
                  onClick={() => handleViewDetails(admin)}
                  className="text-gray-600 hover:text-gray-900"
                  title="View Details"
                >
                  <FaEye size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {renderModal()}
    </div>
  );
};

export default AssignedRoles;
